import { useState, useEffect } from 'react';
import { Card } from './components/Card';
import produtos from './constants/produtos.json';
import { api } from "./api/rmApi";
import style from './App.module.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const geoData = ({lat:-25.4249668, lng:-49.2748863})

  useEffect(() => {
    api.get(`/character/?page=${page}`).then((response) => {
      if(!response.data.results){
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if(error.response.status === 404){
        console.log("Esta página não contém este personagem")
      }
      console.error(error)
    })
  }, [page])

  return (
    <>
    <div className={style.wrapBtns}>
      <button onClick={() => setShow("prod")}>Produtos</button>
      <button onClick={() => setShow("api")}>API</button>
      <button onClick={() => setShow("map")}>Mapa</button>
    </div>
    <div  className={style.wrapPage}>
      <h1>Exercícios de manutenção</h1>
      {show === "prod" &&
        <>
        <h2>Showroom de produtos</h2>
    <div>
    {produtos.map((item) => (
      <div key={item.id}>
        <Card
        name={item.name}
        desc={item.desc}
        categoria={item.categoria}
        value={item.value}
        image={item.image}
        status={item.status === "disponivel" ? (
          <div style={{ color: "green", width: "100px", fontSize: "20px"}}>° disponível</div>
        ) : item.status === "indisponível" ? (
          <div style={{ color: "red", width: "100px", fontSize: "20px"}}>° indisponível</div>
        ) : (
          <div style={{ color: "grey", width: "100px", fontSize: "20px"}}>°</div>
        )}
        />
      </div>
    ))}
    </div>
        </>
      }
     {show === "api" &&
        <>
          <h2>Rick and Morty API</h2>
            <div>
               <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)}/>
            </div>
            <div>
            {data.map((item) => { 
             return(
              <div key={item.id}>
                <Card name={item.name} 
                desc={item.species}
                value={item.value} 
                image={item.image} />
                {/* <button onClick={() => {}}>Info</button> */}
              </div>
              )
           })}
            </div>
       </>
      }
     {show === "map" &&
        <>
      <h2>Mapa</h2>
          <div className={style.maps}>
            <div className={style.map}>
            <MapContainer center={[geoData.lat, geoData.lng ]} zoom={13} scrollWheelZoom={false} style={{width: "100%", height: "100%"}}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[geoData.lat, geoData.lng ]}>
                <Popup>
                    <a target="_blank" href={`https://www.google.com/maps/place/Sistema+Fiep+-+Unidade+Centro/@${geoData.lat},${geoData.lng},17z/data=!3m1!4b1!4m6!3m5!1s0x94dce41197a84179:0x142fc7abe5169a05!8m2!3d-25.4249717!4d-49.272306!16s%2Fg%2F1ptznr269?entry=ttu`}>Google Maps</a>
                </Popup>
                </Marker>
            </MapContainer> 
            </div>       
          </div>
         </>
      }
    </div>
    </>
  )
}

export default App
