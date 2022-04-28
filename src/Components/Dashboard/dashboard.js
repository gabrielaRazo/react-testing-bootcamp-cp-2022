import React, { useCallback, useEffect, useState } from "react";
import moment from 'moment';
import '../../stylesheets/dashboard.css'
import {Col, Spin, Card, Tooltip } from 'antd';

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
      <div className="container-background-dahsboard">
        <br/>
        <Col span={24} offset={0}>
            <form>
                <label htmlFor="fecha">
                    <div className="container-center-dashboard">
                        <span className="txt-label-date">Fecha foto del día:</span>
                        <Tooltip placement="left" title="Click on the caldendar to change the date">
                            <input
                                type="date"
                                id="fecha" 
                                name="fecha"
                                className="border-color-date"
                                value={date}
                                onChange={event => {setDate(event.currentTarget.value); setFetchingApi(true)}}
                            />
                        </Tooltip>
                        {erroMsg === true &&
                            <p>Date must be between Jun 16, 1995 and Apr 27, 2022.</p>
                        }
                    </div>
                </label>
            </form>
        </Col>
        <br/>
        <div class="float-container">
            <div lg={{span:7, offset:1}} class="float-child">
                    <Spin tip="Cargando imagen..." spinning={fetchingApi}>
                        {pictureDayInfo[0] && unexpectedError === false ? (
                            <Card className='card-img-dashboard'>
                                <span className="txt-date-dashboard">{pictureDayInfo[0].date}</span>
                                {pictureDayInfo[0].media_type=='image' ? (
                                    <img className="img-dashboard" src={pictureDayInfo[0].url} alt={pictureDayInfo[0].date}/>
                                    ) : (
                                        <iframe className="img-dashboard" src={pictureDayInfo[0].url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    )}
                                <p className="txt-title-dashboard">{pictureDayInfo[0].title}</p>
                            </Card>
                            ) :(
                                <p>There was an error, please try again.</p>
                            )
                        }
                    </Spin>
            </div>
            <div class="float-child">
                    <div className="space-top"/>
                    {pictureDayInfo[0] && unexpectedError === false &&
                        <span className="txt-info-dashboard">{pictureDayInfo[0].explanation}</span>
                    }
            </div>
        </div>
      </div>
    )
  }