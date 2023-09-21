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
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
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

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const q = query(collection(firestore, "Saved_Items"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        console.log("data",data)
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    getData();
  }, []);

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
        <title>Saved Items</title>
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
                <Typography variant="h4">Saved Items</Typography>
              </Stack>
            </Stack>
            {console.log("products.length", products.length)}
            <CustomersTable
              count={products.length}
              items={products}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
