<<<<<<< HEAD
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import { GetUserTC } from "../../n1-main/a2-bll/store/mainAuthReducer"
import { Redirect } from "react-router-dom"
import { PATH } from "../../n1-main/a1-ui/routes/Routes"
import styles from "../../utils/styles/CommonStylesForAuth.module.css"
=======
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/a2-bll/store/store";
import {GetUserTC} from "../../n1-main/a2-bll/store/mainAuthReducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/a1-ui/routes/Routes";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import s from './Profile.module.css'
>>>>>>> origin/master

const Profile = () => {
    const dispatch = useDispatch()
    const userName = useSelector<AppRootStateType, string>((state) => state.auth.user.name)
    const userEmail = useSelector<AppRootStateType, string>((state) => state.auth.user.email)
    const userAvatar = useSelector<AppRootStateType, string | undefined>(
        (state) => state.auth.user.avatar
    )
    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)
    useEffect(() => {
        dispatch(GetUserTC())
    }, [dispatch])

    if (!isLogged) {
        return <Redirect to={PATH.SIGN_IN} />
    }
<<<<<<< HEAD
    return (
        <div>
            <div>
                <img src={userAvatar} alt="" style={{ height: "300px", width: "300px" }} />
            </div>
            <div>{userName}</div>
            <div>{userEmail}</div>
        </div>
    )
}
export default Profile
=======
    
  return (
    <Card className={s.root}>
      <CardActionArea>
        <CardMedia
          className={s.media}
          image={userAvatar}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Name: {userName}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Email: {userEmail}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime magnam veritatis suscipit. Dolor, quas iste eveniet et saepe quibusdam expedita nihil incidunt quo odio cum culpa, delectus aliquam earum nemo.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small" color="primary">
          Learn More
        </Button>
    </CardActions>
    </Card>
  );
}

export default Profile;
>>>>>>> origin/master
