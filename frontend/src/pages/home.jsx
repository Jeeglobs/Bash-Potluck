import React, { useContext } from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
    IconButton,
    Typography
    } from "@material-tailwind/react";
import { CalendarIcon, ListBulletIcon,} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authcontext";
import moment from 'moment'
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
    const token = useContext(AuthContext)
    const navigate = useNavigate()
    const [hostingEvents, setHostingEvents] = useState()
    const [attendingEvents, setAttendingEvents] =useState()
    const [items, setItems] = useState()
    
    useEffect(() => {
        axios.get('https://potluck.herokuapp.com/events/hosting', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((response) => {
            setHostingEvents(response.data)
        })
        .catch(error => {
            console.error(error);
        });
        
        axios.get('https://potluck.herokuapp.com/events/attending', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
        }).then((response) => {
            setAttendingEvents(response.data)
        })
        .catch(error => {
            console.error(error);
        });
        
        axios.get('https://potluck.herokuapp.com/items', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
        }).then((response) => {
            setItems(response.data)
        })
        .catch(error => {
            console.error(error);
        });
    }, [])
    
    return (
    <>
    <Tabs className='mt-3 px-6' value="events" >
        <TabsHeader>
            <Tab selected={true} value='events'>
                <div className="flex items-center gap-2">
                {React.createElement(CalendarIcon, { className: "w-5 h-5" })}
                "Events"
                </div>
            </Tab>
            <Tab value='items'>
                <div className="flex items-center gap-2">
                {React.createElement(ListBulletIcon, { className: "w-5 h-5" })}
                "Items"
                </div>
            </Tab>
        </TabsHeader>
        <TabsBody animate={{initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 },}}>
            <TabPanel value='events'>
                <Typography variant="h2" className='py-2'>Hosting</Typography>
                {hostingEvents && <Events events={hostingEvents} />}
                <Typography variant="h2" className='py-2'>Attending</Typography>
                {attendingEvents && <Events events={attendingEvents} />}
            </TabPanel>
        </TabsBody>
        <TabsBody animate={{initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 },}}>
            <TabPanel value='items'>
            <Typography variant="h2" className='py-2'>Items</Typography>
                {items &&  <Items items={items}/>}
            </TabPanel>
        </TabsBody>
    </Tabs>
    <InvitationsButton />
    <NewEventButton />
</>
    );
}

function Events({events}) {
    function onClickViewEvent(pk){
        navigate(`/events/${pk}`)
    }

    return (
        <div className="divide-y divide-black">
            {events.map((event, index) => {
                return (
                <div className="" key={index}>
                    <div onClick={() => onClickViewEvent(event.pk)} className="flex py-1 cursor-pointer">
                        <div className="columns-1 py-1" >
                            <h2 className="font-semibold">{event.title}</h2>
                            <p>{moment(event.date_scheduled).format(
                                'MMMM Do YYYY'
                            )} - {event.location_name}</p>
                        </div>
                        <div className="absolute right-0">
                            <IconButton variant="text" className="mt-1 mr-1">
                                <FontAwesomeIcon icon={faAnglesRight} className="w-6 h-6"/>
                            </IconButton>
                        </div>
                    </div> 
                </div>)
            })}
        </div>)
}


function Items({ items }) {
    return (
        <div className="divide-y divide-black">
            {items.map((items, index) => {
                return (
                <div className="" key={index}>
                    <div onClick={() => onClickViewEvent(item.event.pk)} className="flex py-1">
                        <div className="columns-1 py-1" >
                            <h2 className="font-semibold">{items.title}</h2>
                            <p>{items.event.title}</p>
                        </div>
                        <div className="absolute right-0">
                            <IconButton variant="text" className="mt-1 mr-1">
                                <FontAwesomeIcon icon={faAnglesRight} className="w-6 h-6" />
                            </IconButton>
                        </div>
                    </div> 
                </div>)
            })}
        </div>
    )
}


function NewEventButton() {
    function onClickNewEvent(){
        navigate('/events/new')
    }

    return (
        <div className="absolute bottom-5 right-5">
            <Button onClick={onClickNewEvent} className="w-20 rounded-full">
                <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z" clipRule="evenodd" />
                        <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                    </svg>
                </div> Add Event
            </Button>
        </div>
    )
}


function InvitationsButton() {
    function onClickHandleInvitations(){
        navigate('/invitations')
    }

    return (
        <div className="text-center">
            <Button onClick={onClickHandleInvitations} variant='outlined' className="flex m-auto pb-7 h-2 mt-3">
                Invitations (# pending)
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 pb-2">
                    <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
            </Button>
        </div>
    )
    
}