import { Button, Dialog, FormGroup, Grid, TextField, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import DashCard from './DashCard';
import DashCardHeader from './DashCardHeader';
import CustomTransferList from './TaskTransferList';
import i18n from 'dictonaries/i18n';

// style
const FormGroupStyle = styled(FormGroup)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),
}));

// list of tasks
function addTask(task, setActiveTasks) {
  setActiveTasks((prev) => [...prev, { id: uuidv4(), label: task }]);
}
const Tasks = () => {
  const { t } = useTranslation();
  const [openAddTask, setOpenAddTask] = useState(false);
  const [addedTaskName, setAddedTaskName] = useState('');
  const [activeTasks, setActiveTasks] = useState(() =>
    sessionStorage.getItem('activeTasks')
      ? JSON.parse(sessionStorage.getItem('activeTasks'))
      : [
          { id: uuidv4(), label: t('dashboard.Close the target'), status: false },
          {
            id: uuidv4(),
            label: t('dashboard.Send Reminder on UM Email'),
            status: false,
          },
          { id: uuidv4(), label: t('dashboard.Start the Automation'), status: false },
          { id: uuidv4(), label: t('dashboard.Manual Script genrate'), status: true },
          { id: uuidv4(), label: t('dashboard.Sprint Showcase'), status: false },
        ],
  );
  useEffect(() => {
    sessionStorage.setItem('activeTasks', JSON.stringify(activeTasks));
  }, [activeTasks]);
  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };

  const handleCloseAddTask = () => {
    setOpenAddTask(false);
  };
  return (
    <DashCard>
      <Grid container item justifyContent={'space-between'}>
        <Grid item xs={6}>
          <DashCardHeader title={t('dashboard.Tasks')} />
        </Grid>
        <Grid container item alignItems={'center'} justifyContent={'flex-end'} xs={3} padding={'24px 24px 0 24px'}>
          <Button
            fullWidth
            onClick={handleOpenAddTask}
            sx={{ borderRadius: 40 }}
            aria-label={'Add Task'}
            variant="contained"
          >
            {t('dashboard.Add Task')}
          </Button>
        </Grid>
      </Grid>

      <Grid container p={4} justifyContent={'flex-start'}>
        <CustomTransferList setActiveTasks={setActiveTasks} activeTasks={activeTasks} />
      </Grid>
      {console.log(i18n.language)}
      <Dialog
        open={openAddTask}
        sx={{
          direction: i18n.language == 'ar' ? 'ltr' : 'ltr',
        }}
        onClose={handleCloseAddTask}
      >
        <Grid container item xs={12} p={4} gap={4}>
          <Grid item>
            <Typography variant="h5" fontWeight={600}>
              {t('dashboard.addTaskTitle')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={addedTaskName}
              onChange={(e) => setAddedTaskName(e.target.value)}
              fullWidth
              label={t('Task Name')}
            />
          </Grid>
          <Grid container item spacing={4}>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" onClick={handleCloseAddTask}>
                {t('dashboard.Discard')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  addTask(addedTaskName, setActiveTasks);
                  handleCloseAddTask();
                }}
                autoFocus
              >
                {t('dashboard.Add')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </DashCard>
  );
};

export default Tasks;
