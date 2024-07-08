/* eslint-disable */
import { Services } from '../schema/ServicesSchema';

import { Grid, TextField, Typography } from '@mui/material';
import GetAnswerToolbar from 'components/services/GetAnswerToolbar';
import ServicesSidebar from 'components/services/ServicesSidebar';
import { AlertContext } from 'hooks/context/AlertContext';
import i18next from 'i18next';
import TasksItem from 'pages/dashboard/TasksItem';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { numbersOnly } from 'utils/DefualtValidators';
import { handleGetResponse } from 'utils/api/answer/service';
import { handleFetchCurrentUser } from 'utils/users/users';

const ServicesGetAnswer = ({}) => {
  let { servicename = 'Visas' } = useParams();
  const [answer, setAnswer] = useState('');
  const [currentUserData, setCurrentUserData] = useState({});
  const isEligiable = useRef(false);
  const { t } = useTranslation();
  const [currService, setCurrService] = useState(Services.filter((service) => service.enName == servicename)[0]);
  console.log(currService);
  const [loading, setLoading] = useState();
  const { setAlert, handleCloseAlert } = useContext(AlertContext);
  const lang = i18next.language;
  const navigate = useNavigate();
  const [options, setOptions] = useState(() => {
    const options = {};
    currService.options.map((o) => (options[o['id']] = false));
    return options;
  });
  useEffect(() => {
    setOptions(currService.options.map((o) => (options[o['id']] = false)));
  }, [currService]);
  // form submit
  const handelCheckValue = (id, status) => {
    options[id] = status;
  };
  // hook form
  useEffect(() => {
    handleFetchCurrentUser({
      requestAction: 'SET_CURRENT_USER',
      setCurrentUserData,
      setAlert,
    });
  }, []);
  useEffect(() => {
    if (servicename == 'General' || currentUserData.role == 'ADMIN') {
      isEligiable.current = true;
    } else {
      if (currentUserData.roboAuthorities) {
        currentUserData.roboAuthorities.map((auth) => {
          if (currService.allowedAuthorities.includes(auth.name)) isEligiable.current = true;
        });
        if (!isEligiable.current) navigate('/dash/services');
      }
    }
    return setAlert();
  }, [currentUserData]);
  function handleChangeCurrentService(serviceName, setCurrService) {
    navigate('/dash/services/getAnswer/' + serviceName, { replace: true });

    setCurrService(Services.filter((service) => service.enName == serviceName)[0]);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      establishment_number: '',
      id_number: '',
      check_options: '',
    },
  });
  return (
    <Grid container item alignItems={'flex-start'} flexWrap={'nowrap'} gap={8}>
      <Grid container item sm={12} md={10} gap={4}>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            {lang === 'en' ? currService.enName : currService.arName}
          </Typography>
        </Grid>
        {console.log(currService.enName)}
        <form
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          onSubmit={handleSubmit(async (data) => {
            if (isEligiable.current) {
              setLoading(true);
              setAnswer('');
              setAlert({
                alertType: 'info',
                sleep: 5000000,
                alertMsg: 'Generating Ticket Answer',
              });
              await handleGetResponse({
                requestAction: 'SET_ANSWER',
                setAnswer,
                data,
                servicename: currService.enName,
                options,
                setAlert,
              });
              setLoading(false);
            } else {
              setAlert({
                alertType: 'error',
                alertMsg: 'Sorry You Are not Eligiable to use this service',
              });
            }
          })}
        >
          <Grid container item position={'relative'} xs={12} gap={4}>
            <Grid container item spacing={4}>
              <Grid container item xs={12} gap={1}>
                <Grid item xs={12}>
                  <Typography variant="body2" fontWeight={500}>
                    {t('getAnswerForm.Reason')} *
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    {...register('reason', {
                      onChange: (e) =>
                        numbersOnly(e, {
                          type: 'IDNo',
                          maxNumber: 10,
                          replaceWith: '',
                        }),
                      onPaste: (e) =>
                        numbersOnly(e, {
                          type: 'IDNo',
                          maxNumber: 10,
                          replaceWith: '',
                        }),
                    })}
                    disabled={loading}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={4}>
                <Grid container item xs={12} gap={1} md={6}>
                  <Grid item xs={12}>
                    <Typography variant="body2" fontWeight={500}>
                      {t('getAnswerForm.Establishment Number')} *
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-multiline-static"
                      pattern="[0-9]*"
                      {...register('establishmentNumber', {
                        onChange: (e) => numbersOnly(e),
                        onPaste: (e) => numbersOnly(e),
                        require: true,
                      })}
                      disabled={loading}
                      error={errors.email ? true : false}
                      helperText={errors.email && 'Enter a valid email address'}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={6} gap={1}>
                  <Grid item xs={12}>
                    <Typography variant="body2" fontWeight={500}>
                      {t('getAnswerForm.ID or Iqameh')} *
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-multiline-static"
                      {...register('id_number', {
                        onChange: (e) =>
                          numbersOnly(e, {
                            type: 'IDNo',
                            maxNumber: 10,
                            replaceWith: '',
                          }),
                        onPaste: (e) =>
                          numbersOnly(e, {
                            type: 'IDNo',
                            maxNumber: 10,
                            replaceWith: '',
                          }),
                      })}
                      disabled={loading}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid container gap={4} item xs={12}>
                {currService.options.map((el) => (
                  <Grid key={el.label.enLabel} item>
                    <TasksItem
                      key={el.id}
                      id={el.id}
                      status={!el.active}
                      label={lang === 'en' ? el.label.enLabel : el.label.arLabel}
                      mission={false}
                      checkOptions={handelCheckValue}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                readOnly
                id="outlined-multiline-static"
                label={t('getAnswerForm.answer')}
                value={answer}
                style={{ direction: 'rtl' }}
                InputProps={{
                  readOnly: true,
                  style: { fontSize: '20px' },
                }}
                disabled
                multiline
                rows={10}
                fullWidth
              />
            </Grid>
            <GetAnswerToolbar
              searchLabel={t('getAnswerForm.searchButton')}
              backLabel={t('getAnswerForm.backButton')}
              loading={loading}
            />
          </Grid>
        </form>
      </Grid>
      <ServicesSidebar
        currService={currService}
        currentUserData={currentUserData}
        handleChangeCurrentService={handleChangeCurrentService}
        setCurrService={setCurrService}
      />
    </Grid>
  );
};

export default ServicesGetAnswer;
