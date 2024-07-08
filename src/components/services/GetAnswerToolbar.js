import { Button, Grid } from '@mui/material';
function GetAnswerToolbar({ loading, searchLabel, backLabel }) {
  return (
    <Grid container item spacing={4} marginBottom={4}>
      <Grid item xs={12} md={6}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          style={{
            width: '100%',
            color: 'white',
          }}
          href="/dash/services"
        >
          {backLabel}
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button fullWidth variant="contained" type="submit" disabled={loading} disableElevation>
          {searchLabel}
        </Button>
      </Grid>
    </Grid>
  );
}

export default GetAnswerToolbar;
