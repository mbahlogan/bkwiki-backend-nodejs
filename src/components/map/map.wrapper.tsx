"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { ATMType } from "@/types";
import { mapStyle } from "./style";

export default function MapWrapper({ data, onMarkerClick }: { data: ATMType[], onMarkerClick: any }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async (container: HTMLDivElement) => {
      const mapOptions: google.maps.MapOptions = {
        center: {
          lat: Number(data[0].latitude),
          lng: Number(data[0].longitude),
        },
        zoom: 10,
        mapId: "BKWIKI_01",
        disableDefaultUI: true,
        styles: mapStyle,
      };

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: "weekly",
        libraries: ["places"],
      });

      const { Map } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await loader.importLibrary(
        "marker"
      );

    
      const map = new Map(container, mapOptions);

      async function addMarkers(m: any, data: ATMType[] = []) {
        const markers = data.map((m, i) => {
          const img = document.createElement("img");
          img.src = m.organisation?.logo?.url as string;
          img.classList.add("mapImg");

          const pinGlyph = new PinElement({
            glyph: img,
            glyphColor: "white",
            background: "white",
            scale: 1.3,
          });

          const marker = new AdvancedMarkerElement({
            position: {
              lat: Number(m.latitude),
              lng: Number(m.longitude),
            },
            content: pinGlyph.element,
            title: m.name,
          });

          marker.addListener("click", () => {
            onMarkerClick(m)
          });
          return marker;
        });
        new MarkerClusterer({ markers, map: m });
      }

      addMarkers(map, data);
    };

    if (mapRef.current) {      
      initMap(mapRef.current);
    }
  }, [mapRef.current]);
  return <div className="h-full w-full min-h-[800px]" ref={mapRef}></div>;
}


