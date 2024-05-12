import { FormGroup } from "@mui/material";
import DashCard from "./DashCard";
import DashCardHeader from "./DashCardHeader";
import TasksItem from "./TasksItem";
import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";

// style
const FormGroupStyle = styled(FormGroup)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),
}));

// list of tasks

const Tasks = () => {
  const { t } = useTranslation();
  const TASK_LIST = [
    { id: "chk_1", label: t("dashboard.Close the target"), status: false },
    {
      id: "chk_2",
      label: t("dashboard.Send Reminder on UM Email"),
      status: false,
    },
    { id: "chk_3", label: t("dashboard.Start the Automation"), status: false },
    { id: "chk_4", label: t("dashboard.Manual Script genrate"), status: true },
    { id: "chk_5", label: t("dashboard.Sprint Showcase"), status: false },
  ];
  return (
    <DashCard>
      <DashCardHeader title="Tasks" />

      <FormGroupStyle>
        {TASK_LIST.map((el) => (
          <TasksItem
            key={el.id}
            id={el.id}
            status={el.status}
            label={el.label}
            checkOptions={() => {}}
          />
        ))}
      </FormGroupStyle>
    </DashCard>
  );
};

export default Tasks;
