import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';

export const SettingsPassword = ({ auth }) => {
  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirm: ''
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (values.newPassword !== values.confirm) {
        console.error('New password and confirm password do not match');
        return;
      }

      try {
        // Reauthenticate the user with their current password
        const credentials = auth.EmailAuthProvider.credential(
          auth.currentUser.email,
          values.oldPassword
        );
        await auth.currentUser.reauthenticateWithCredential(credentials);

        // Update the password
        await auth.currentUser.updatePassword(values.newPassword);

        console.log('Password updated successfully');
      } catch (error) {
        console.error('Error updating password:', error.message);
      }
    },
    [auth, values.newPassword, values.confirm]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Old Password"
              name="oldPassword"
              onChange={handleChange}
              type="password"
              value={values.oldPassword}
            />
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              onChange={handleChange}
              type="password"
              value={values.newPassword}
            />
            <TextField
              fullWidth
              label="New Password (Confirm)"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
