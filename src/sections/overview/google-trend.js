import PropTypes from 'prop-types';
import ArrowTrendingUpIcon from '@heroicons/react/24/solid/ArrowTrendingUpIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const Google = (props) => {
  const { totalPosts, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Google trending
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ArrowTrendingUpIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {totalPosts && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
             
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {totalPosts}
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Searches
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

Google.prototypes = {
  totalPosts: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
