import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user details!", error);
        setError("There was an error fetching the user details.");
      });
  }, [id]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>Loading user details...</Typography>;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              User Details
            </Typography>
            <Typography variant="body2" component="p">
              <strong>User ID:</strong> {user.user_id}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Role:</strong> {user.role}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Manager ID:</strong> {user.managerid}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Status:</strong> {user.status}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Specialization:</strong> {user.specialization}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserDetailPage;
