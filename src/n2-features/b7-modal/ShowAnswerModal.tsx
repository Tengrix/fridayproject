import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SimpleModal from './SimpleModal';
import { Button, Checkbox } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCardsTC, updateGradeTc } from '../../n1-main/a2-bll/store/cardsReducer';

type ShowAnswerModalType = {
  name:string
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: "lightpink",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ShowAnswerModal(props:ShowAnswerModalType) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  
  useEffect(() => {
    dispatch(updateGradeTc(4, "60abbfbd6a39d35b188ef6f2"))
}, [dispatch])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Learn "Pack Name"</h2>
      <div id="simple-modal-description">
        <div>Question:{"JavaScript"}</div>
        <div>Answer:{"YESYESYESYES"}</div>
      </div>
      <div>
        <h4>Rate Yourself</h4>
        <Checkbox></Checkbox>
        <Checkbox></Checkbox >
      </div>
      <Button color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button >
      <Button color="primary" variant="outlined">Next</Button >
    </div>
  );

  return (
    <div>
      <Button variant="outlined" color="primary" type="button" onClick={handleOpen}>
        {props.name}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}