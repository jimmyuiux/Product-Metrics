import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon, TextField, Button, Stack } from '@mui/material';
import { useCallback, useState } from 'react';

const websites = [
  {
    value: 'alibaba.com',
    label: 'Alibaba'
  },
  {
    value: 'amazon.com',
    label: 'Amazon'
  }
];

export const CustomersSearch = (props) => {
  const [values, setValues] = useState({
    website: 'amazon.com',
    search_term: ''
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }, []);

  return (
    <Card sx={{ p: 2 }}>
      <Stack alignItems="center" direction="row" spacing={2}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          name="search_term"
          onChange={handleChange}
          placeholder="Search product"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
        <TextField
          fullWidth
          label="Select website"
          name="website"
          onChange={handleChange}
          required
          select
          SelectProps={{ native: true }}
          value={values.website}
        >
          {websites.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button onClick={()=>props.getData(values)}>
          Search
        </Button>
      </Stack>
    </Card>
  );
};
