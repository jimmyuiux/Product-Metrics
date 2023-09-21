import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/product/products-table";
import { CustomersSearch } from "src/sections/product/products-search";
import { applyPagination } from "src/utils/apply-pagination";
import { publicDecrypt } from "crypto";
import { ToastContainer, toast } from "react-toastify";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase";

const axios = require("axios");
const now = new Date();
const firestore = getFirestore(app);
console.log("firestore", firestore);
let time = 1;

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [products, setCustomers] = useState([]);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    [page, rowsPerPage]
  );

  const getData = async (values = {}) => {
    console.log("values", values);

    if (!values.search_term) toast.error("Please enter a search term");

    if (values.website == "amazon.com") {
      // set up the request parameters
      const params = {
        api_key: "87F40CBA3677445DBEED9739D15882D3",
        type: "search",
        amazon_domain: values.website,
        search_term: values.search_term,
      };
      axios
        .get("https://api.rainforestapi.com/request", { params })
        .then((response) => {
          // print the JSON response from Rainforest API
          const cust = applyPagination(response.data.search_results, page, rowsPerPage);
          setCustomers(cust);
        })
        .catch((error) => {
          // catch and print the error
          console.log(error);
        });
    } else if (values.website == "alibaba.com") {
      const axios = require("axios");

      const options = {
        method: "GET",
        url: "https://otapi-1688.p.rapidapi.com/BatchSearchItemsFrame",
        params: {
          language: "en",
          framePosition: "0",
          frameSize: "50",
          ItemTitle: values.search_term,
          OrderBy: "Popularity:Desc",
          MinPrice: "1",
          MaxPrice: "5000",
          MinVolume: "50",
        },
        headers: {
          "X-RapidAPI-Key": "133ebf9baamshad10af635eab94cp12a624jsn240c636d825b",
          "X-RapidAPI-Host": "otapi-1688.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log("response of alibaba", response.data);
        const cust = applyPagination(response.data.search_results, page, rowsPerPage);
        setCustomers(cust);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const saveItem = async (item) => {
    // Add a new document with a generated ID to the "items" collection

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user",user)
    await addDoc(collection(firestore, "Saved_Items"), {
      ...item,
      email: user.email,
    });
  };

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    [page, rowsPerPage]
  );

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Search For Products</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Search For Products</Typography>
              </Stack>
            </Stack>
            <CustomersSearch getData={getData} />
            {console.log("products.length", products.length)}
            <CustomersTable
              count={products.length}
              items={products}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              showSaveItem={true}
              saveItem={saveItem}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
