import React, { useCallback, useEffect, useState } from "react";
import moment from 'moment';
import '../../stylesheets/dashboard.css'
import {Col, Spin } from 'antd';

export const Dashboard = () => {
    const [pictureDayInfo, setPictureDayInfo] = useState([])
    const [fetchingApi, setFetchingApi] = useState(true);
    const [erroMsg, setErrorMsg] = useState(false);
    const [unexpectedError, setUnexpectedError] = useState(false)
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"))


    const fetchMyAPI = useCallback(async () => {
        if(moment(date).isAfter(moment(new Date()).format("YYYY-MM-DD"))===true || moment('1995-06-16').isSameOrAfter(date)===true ){
            setErrorMsg(true)
        }else{
            const apiKey = 'wOjD8BmGH4ZViJyv2OpeZlKfSaA24XkEcvmyipkF';
            let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${date}&end_date=${date}`)
            console.log("entré", response.status)
            if(response.status!=200){
                setUnexpectedError(true);
            }
            setUnexpectedError(false);
            response = await response.json();
            setPictureDayInfo(response);
            setFetchingApi(false);
            setErrorMsg(false);
        }
        
    }, [date]) 
    
      useEffect(() => {
        fetchMyAPI()
      }, [fetchMyAPI])

    return (
      <>
        <br/>
        <Col span={24} offset={0}>
        <form>
            <label htmlFor="fecha">
                <div className="container-center-dashboard">
                    Ingresa una fecha
                    <input
                        type="date"
                        id="fecha" 
                        name="fecha"
                        value={date}
                        onChange={event => {setDate(event.currentTarget.value); setFetchingApi(true)}}
                    />
                    {erroMsg === true &&
                        <p>Date must be between Jun 16, 1995 and Apr 27, 2022.</p>
                    }
                </div>
            </label>
        </form>
        </Col>
        <br/>
        
        <Col span={18} offset={1}>
            <Spin tip="Cargando imagen..." spinning={fetchingApi}>
            {pictureDayInfo[0] && unexpectedError === false ? (
                <img className="img-dashboard" src={pictureDayInfo[0].url} alt={pictureDayInfo[0].date}/>
                ) :(
                    <p>There was an error, please try again.</p>
                )
            }
            </Spin>
        </Col>
      </>
    )
  }