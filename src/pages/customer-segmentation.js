import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  Pagination,
  Button,
  Stack,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import axios from "axios";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { OverviewGender } from "src/sections/overview/overview-gender";
import { OverviewDeviceType } from "src/sections/overview/overview-device-type";
import { OverviewCutomerLogin } from "src/sections/overview/overview-customer-login";
import { OverviewPayment } from "src/sections/overview/overview-payment";
import { OverviewCat } from "src/sections/overview/overview-top-cat";
import { OverviewTotalCust } from "src/sections/overview/overview-total-cust";
import { OverviewTotalSales } from "src/sections/overview/overview-total-Sales";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";


const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Implement your file upload logic here
      console.log("Uploading file:", selectedFile);
      fetchData();
      // You can use Fetch or any other method to send the file to the server
    } else {
      console.log("No file selected.");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const result = await axios.get("http://localhost:5000/get_bar_plot_coordinates");
    setTimeout(() => {
    console.log("result", result);
    setData(result.data);
    setLoading(false);
    }, 10000);
  };

  return (
    <>
      <Head>
        <title>Customer Segmentation</title>
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
                <Typography variant="h4">Customer Segmentation</Typography>
              </Stack>
            </Stack>
            <Card>
              <CardHeader title="Upload File" />
              <Divider />
              <CardContent>
                <Stack spacing={3} sx={{ maxWidth: 400 }}>
                  <TextField
                    type="file"
                    accept=".csv" // Set accepted file types here
                    onChange={handleFileChange}
                  />
                </Stack>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={!selectedFile || loading}
                >
                  {loading ? "Calculating results..." : "Run Segmentation"}
                </Button>
              </CardActions>
            </Card>
            {data && (
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} lg={4}>
                  <OverviewTotalCust
                    difference={12}
                    positive
                    sx={{ height: "100%" }}
                    value={data ? data.total_customers.toLocaleString("en-US") : 0}
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  <OverviewTotalSales
                    difference={12}
                    positive
                    sx={{ height: "100%" }}
                    value={data ? data.total_sales.toLocaleString("en-US") : 0}
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  <OverviewTotalProfit
                    difference={12}
                    positive
                    sx={{ height: "100%" }}
                    value={data ? "$ " + data.total_profit.toLocaleString("en-US") : 0}
                  />
                </Grid>
                <Grid xs={12} lg={8}>
                  <OverviewCat
                    chartSeries={[
                      {
                        name: "Total sales",
                        data: data ? data.sales_by_category.y_coords : [],
                      },
                    ]}
                    categories={data ? data.sales_by_category.x_coords : []}
                    sx={{ height: "100%" }}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                  <OverviewGender
                    chartSeries={data ? data.sales_by_gender.percentages : []}sales_by_device_type_percentage
                    labels={data ? data.sales_by_gender.labels : []}
                    sx={{ height: "100%" }}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={6}>
                  <OverviewDeviceType
                    chartSeries={data ? data.sales_by_device_type.percentages : []}
                    labels={data ? data.sales_by_device_type.labels : []}
                    sx={{ height: "100%" }}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={6}>
                  <OverviewPayment
                    chartSeries={data ? data.sales_by_payment_method.percentages : []}
                    labels={data ? data.sales_by_payment_method.labels : []}
                    sx={{ height: "100%" }}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                  <OverviewCutomerLogin
                    chartSeries={data ? data.sales_by_login_type.percentages : []}
                    labels={data ? data.sales_by_login_type.labels : []}
                    sx={{ height: "100%" }}
                  />
                </Grid>
                
                <Grid xs={12} lg={8}>
                  <OverviewSales
                    chartSeries={[
                      {
                        name: "Total Sold",
                        data: data ? data.top_products.y_coords : [],
                      },
                    ]}
                    categories={data ? data.top_products.x_coords : []}
                    sx={{ height: "100%" }}
                  />
                </Grid>
              </Grid>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
