import { useTranslation } from "react-i18next";

import { getUserHistory } from "~/services/ApiServices";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import "./UserSetting.scss";
import { useState } from "react";
function UserHistory({ setShow }) {
  const currentAccount = useSelector((state) => state.user.account);
  const { t } = useTranslation();
  const [dataHistory, setDataHistory] = useState([]);
  const handleClickGetHistory = async () => {
    let res = await getUserHistory();
    console.log(res);
    if (res && res.EC === 0) {
      setDataHistory(res.DT);
      console.log(dataHistory);
    }
  };
  return (
    <Form className="row">
      <Form.Group className="form-footer">
        <Button className="btn btn-secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button
          className="btn btn-primary"
          onClick={() => handleClickGetHistory()}
        >
          Save
        </Button>
      </Form.Group>
    </Form>
  );
}
export default UserHistory;
