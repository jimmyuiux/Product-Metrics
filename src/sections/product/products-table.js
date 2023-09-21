import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    // onDeselectAll,
    // onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    // onSelectAll,
    // onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  // const selectedSome = (selected.length > 0) && (selected.length < items.length);
  // const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                {props.showSaveItem && <TableCell>Action</TableCell>}
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Total Ratings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log("items", items)}
              {items &&
                items.map((product) => {
                  const isSelected = selected.includes(product.id);
                  // const createdAt = format(product.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow hover key={product.id} selected={isSelected}>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src={product.image}>{/* {getInitials(product.name)} */}</Avatar>
                          <Typography variant="subtitle2">{product.title}</Typography>
                        </Stack>
                      </TableCell>
                      {props.showSaveItem && <TableCell>
                        <Button onClick={() => props.saveItem(product)}>Save</Button>
                      </TableCell>}
                      <TableCell>{product.price && product.price.value}</TableCell>
                      <TableCell>{product.rating}</TableCell>
                      <TableCell>{product.ratings_total}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  // onDeselectAll: PropTypes.func,
  // onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  // onSelectAll: PropTypes.func,
  // onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  // selected: PropTypes.array
};
