import {
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import i18n from 'dictonaries/i18n';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { handleSubmitUserNewService } from 'utils/users/users';

function ServiceDialog({
  isEditServiceDialogOpen,
  handleCloseServiceDialog,
  userId,
  tableData,
  setAlert,
  serviceList,
  setTableData,
  userActiveService,
}) {
  const [userNewService, setUserNewService] = useState();
  const handleChangeUserNewService = (serviceId) => {
    setUserNewService(serviceId.target.value);
  };
  const { t } = useTranslation();
  return (
    <Dialog
      disableEscapeKeyDown
      open={isEditServiceDialogOpen}
      onClose={handleCloseServiceDialog}
      fullWidth
      maxWidth={'sm'}
      sx={{
        direction: i18n.language == 'ar' ? 'ltr' : 'ltr',
      }}
    >
      <Grid container item xs={12} p={4} gap={4}>
        <Grid item>
          <Typography variant="h5" fontWeight={600}>
            {t('usersTable.Choose User Main Service')} *
          </Typography>
        </Grid>
        <FormControl sx={{ my: 1, width: '100%' }}>
          <InputLabel id="main_service">{t('usersTable.Service')}</InputLabel>
          <Select
            id="main_service"
            fullWidth
            defaultValue={userActiveService}
            onChange={handleChangeUserNewService}
            input={<OutlinedInput label="Service" />}
          >
            {serviceList?.map?.((service) => (
              <MenuItem key={service.id} value={service.service}>
                {service.service.split('_').join(' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container item spacing={4}>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" onClick={handleCloseServiceDialog}>
              {t('usersTable.Cancel')}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={() =>
                handleSubmitUserNewService({
                  handleCloseServiceDialog,
                  userId,
                  userNewService,
                  requestAction: 'SET_SUBMIT_USER_SERVICE',
                  tableData,
                  setTableData,
                  setAlert,
                })
              }
            >
              {t('usersTable.Submit')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ServiceDialog;
