import { Grid, Modal, Popper } from '@mui/material';
import tableColumns from 'constants/tableColumns';
import { AlertContext } from 'hooks/context/AlertContext';
import MUIDataTable from 'mui-datatables';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { glassMorphisimStyle } from 'styles/styles';
import { handleFilterAuthorities } from 'utils/table/tableReshape';
import {
  handleFetchAllUsers,
  handleFetchAuthorities,
  handleFetchCurrentUser,
  handleFetchServiceList,
} from 'utils/users/users';
import LoadingTableBody from './TableLoading';
import DNDServicesModal from './dialogs/DNDServicesModal';
import ServiceDialog from './dialogs/ServiceDialog';
import RolesPopper from './poppers/RolesPopper';
import './usersTable.css';
function UserTable() {
  const [tableData, setTableData] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const { setAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceList, setServiceList] = useState([]);
  const [userData, setUserData] = useState({ userId: null });
  const [isEditServiceDialogOpen, setIsEditServiceDialogOpen] = useState(false);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [currentUserData, setCurrentUserData] = useState({});
  const [isOpenServicesModal, setIsOpenServicesModal] = useState(false);
  const { t } = useTranslation();

  const handleCloseRolePopper = () => setStatusAnchorEl(undefined);

  const handleCloseServicesModal = () => {
    setIsOpenServicesModal(false);
  };
  const handleCloseServiceDialog = () => {
    setIsEditServiceDialogOpen(false);
  };
  const handleOpenServiceDialog = (tableData) => {
    setUserData(tableData);
    setIsEditServiceDialogOpen(true);
  };
  const handleStatusClick = (event, rowData) => {
    setUserData(rowData);

    setStatusAnchorEl(statusAnchorEl ? null : event.currentTarget);
  };
  const handleOpenServiceModal = (userData) => {
    setAuthorities(handleFilterAuthorities(authorities, userData[9]));
    setUserData(userData);
    setIsOpenServicesModal(true);
  };
  const statusOpen = Boolean(statusAnchorEl);

  const statusPopperId = statusOpen ? 'simple-popper' : undefined;

  const BodyComponent = useMemo(() => (props) => <LoadingTableBody loading={isLoading} {...props} />, [isLoading]);
  useEffect(() => {
    handleFetchAllUsers({
      setTableData,
      requestAction: 'GET_ALL_USERS',
      setIsLoading: () => {},
      setAlert,
    });
    handleFetchCurrentUser({
      requestAction: 'SET_CURRENT_USER',
      setCurrentUserData,
      setAlert,
      setIsLoading: () => {},
    });
    handleFetchAuthorities({
      setAuthorities,
      requestAction: 'GET_ALL_AUTHORITIES',
      setIsLoading,
      setAlert,
    });
  }, []);
  useEffect(() => {
    if (currentUserData.role === 'ADMIN') {
      handleFetchServiceList({
        setServiceList,
        requestAction: 'SET_SERVICE_LIST',
        setIsLoading: () => {},
        setAlert,
      });
    }
  }, [currentUserData]);
  const options = {
    filterType: 'checkbox',
    selectableRowsHeader: false,
    textLabels: {
      pagination: {
        next: 'Next Page',
        previous: 'Previous Page',
        rowsPerPage: t('usersTable.Rows per page'),
        displayRows: 'of',
      },
    },
  };
  // console.log("loaaaaaaaaaaaaaaaaaading===================>", isLoading);
  return (
    <Grid container item gap={4}>
      <Grid container item>
        <MUIDataTable
          title={t('usersTable.Users List')}
          data={tableData}
          columns={tableColumns({
            setUserData,
            handleStatusClick,
            handleOpenServiceDialog,
            handleOpenServiceModal,
            currentUserData,
          })}
          options={options}
          components={{ TableBody: BodyComponent }}
        />
      </Grid>

      <Modal
        open={isOpenServicesModal}
        onClose={handleCloseServicesModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container item xs={12} md={6} sx={glassMorphisimStyle}>
          <DNDServicesModal
            userData={userData}
            authorities={authorities}
            setTableData={setTableData}
            tableData={tableData}
            setAuthorities={setAuthorities}
            handleCloseServicesModal={handleCloseServicesModal}
          />
        </Grid>
      </Modal>
      {console.log(userData)}
      {isEditServiceDialogOpen && (
        <ServiceDialog
          authorities={authorities}
          userId={userData[0]}
          userActiveService={userData[8]}
          isEditServiceDialogOpen={isEditServiceDialogOpen}
          handleCloseServiceDialog={handleCloseServiceDialog}
          tableData={tableData}
          setTableData={setTableData}
          setAlert={setAlert}
          serviceList={serviceList}
          setServiceList={setServiceList}
        />
      )}
      <Popper id={statusPopperId} open={statusOpen} anchorEl={statusAnchorEl} sx={glassMorphisimStyle}>
        {userData && (
          <RolesPopper
            tableData={tableData}
            setTableData={setTableData}
            userData={userData}
            handleCloseRolePopper={handleCloseRolePopper}
          />
        )}
      </Popper>
    </Grid>
  );
}

export default UserTable;
