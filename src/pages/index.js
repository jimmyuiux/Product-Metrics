import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { TwitterTrends } from "src/sections/overview/twitter-trend";
import { Instagram } from "src/sections/overview/instagram-trends";
import { Google } from "src/sections/overview/google-trend";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewLatestDeals } from "src/sections/overview/overview-latest-deals";

import moment from "moment";
const axios = require("axios");

const now = new Date();

const Page = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [bestDeals, setBestDeals] = useState([]);
  const [instaTrend, setInstaTrend] = useState({});
  const [googleTrend, setGoogleTrend] = useState({});
  const [twitterTrend, setTwitterTrend] = useState({});


  useEffect(() => {
    getBestSellers();
    getBestDeals();
    getinstagramHashTag();
    getGoogleTrends();
    getTwitterTrends();
  }, []);

  const getBestSellers = async () => {
    // set up the request parameters
    const params = {
      api_key: "87F40CBA3677445DBEED9739D15882D3",
      type: "bestsellers",
      amazon_domain: "amazon.com",
      category_id: "bestsellers_electronics",
    };

    // make the http GET request to Rainforest API
    axios
      .get("https://api.rainforestapi.com/request", { params })
      .then((response) => {
        // print the JSON response from Rainforest API
        // console.log(JSON.stringify(response.data, 0, 2));
        const data = response.data.bestsellers;
        data.length = 10;
        setBestSellers(data);
      })
      .catch((error) => {
        // catch and print the error
        console.log(error);
      });
  };

  const getBestDeals = async () => {
    // set up the request parameters
    const params = {
      api_key: "87F40CBA3677445DBEED9739D15882D3",
      type: "deals",
      amazon_domain: "amazon.com",
      category_id: "172282",
    };

    // make the http GET request to Rainforest API
    axios
      .get("https://api.rainforestapi.com/request", { params })
      .then((response) => {
        // print the JSON response from Rainforest API
        const data = response.data.deals_results;
        data.length = 10;
        setBestDeals(data);
      })
      .catch((error) => {
        // catch and print the error
        console.log(error);
      });
  };

  const getinstagramHashTag = async () => {
    const options = {
      method: "GET",
      url: "https://top-instagram-hashtag.p.rapidapi.com/new-hashtags",
      params: { page: "0" },
      headers: {
        'X-RapidAPI-Key': 'b9a04c6a78msh2e2614afc1fe130p155e41jsn5916ea38f713',
        'X-RapidAPI-Host': 'top-instagram-hashtag.p.rapidapi.com'
      },
    };

    try {
      const response = await axios.request(options);
      console.log("insta data", response.data);
      const data = response.data.data.row[0];
      setInstaTrend(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGoogleTrends = async () => {
    const options = {
      method: "GET",
      url: "https://google-trends8.p.rapidapi.com/trendings",
      params: {
        region_code: "US",
        date: moment().format("YYYY-MM-DD"),
        hl: "en-US",
      },
      headers: {
        'X-RapidAPI-Key': 'f7584d2870msh51172e001480583p1dc717jsnc1062d321dbf',
    'X-RapidAPI-Host': 'google-trends8.p.rapidapi.com'
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data.items[0];
      console.log("google data", response.data);
      setGoogleTrend(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTwitterTrends = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("woeid", "23424977");

    const options = {
      method: "POST",
      url: "https://twitter-trends5.p.rapidapi.com/twitter/request.php",
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'b9a04c6a78msh2e2614afc1fe130p155e41jsn5916ea38f713',
        'X-RapidAPI-Host': 'twitter-trends5.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log("twitter data", response.data);
      const data = response.data.trends[1];
      setTwitterTrend(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={4}>
              <Instagram
                totalPosts={instaTrend.total}
                positive
                sx={{ height: "100%" }}
                value={instaTrend.tag}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <Google
                totalPosts={googleTrend.formattedTraffic}
                positive
                sx={{ height: "100%" }}
                value={googleTrend.query}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <TwitterTrends totalPosts={twitterTrend.volume} positive sx={{ height: "100%" }} value={twitterTrend.name} />
            </Grid>
            <Grid xs={12} md={6} lg={6}>
              <OverviewLatestDeals
                heading="Deals of the day"
                products={bestDeals}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={6}>
              <OverviewLatestProducts
                heading="Best Seller Products"
                products={bestSellers}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
