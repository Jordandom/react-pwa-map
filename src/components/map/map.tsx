import 'maplibre-gl/dist/maplibre-gl.css';

import { LineLayer } from '@deck.gl/layers/typed';
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import FlightPanel from 'components/flight-panel/flight-panel';
import { mapStyle } from 'config';
import { useCallback, useMemo, useState } from 'react';
import MapLibre, {
  FullscreenControl,
  MapLayerMouseEvent,
  Marker,
  NavigationControl,
  ScaleControl,
  useControl,
} from 'react-map-gl/maplibre';
import { Lines, Markers } from 'types';
import { generateUniqueId } from 'utils/helpers';

const initialViewport = {
  latitude: 50.1056994467727,
  longitude: 14.478206744518863,
  zoom: 14,
  pitch: 0,
  bearing: 0,
};

function DeckGLOverlay(
  props: MapboxOverlayProps & {
    interleaved?: boolean;
  }
) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export const Map = () => {
  const [lines, setLines] = useState<Lines[]>([]);
  const [markers, setMarkers] = useState<Markers[]>([]);

  const handleMarkerClick = useCallback(
    (newMarker: { longitude: number; latitude: number }) => {
      if (markers.length > 0) {
        const newLines = [
          {
            sourcePosition: [
              markers[markers.length - 1].longitude,
              markers[markers.length - 1].latitude,
            ],
            targetPosition: [newMarker.longitude, newMarker.latitude],
          },
        ];

        setLines((prevLines) => [...prevLines, ...newLines]);
      }
    },
    [markers]
  );

  const handleClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const { lngLat } = event;
      const newMarker = {
        id: generateUniqueId(),
        order: markers.length + 1,
        longitude: lngLat.lng,
        latitude: lngLat.lat,
      };
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      handleMarkerClick(newMarker);
    },
    [handleMarkerClick, markers.length]
  );

  const layers = useMemo(
    () => [
      new LineLayer({
        id: 'line-layer',
        data: lines,
        getColor: [0, 128, 255],
        getWidth: 4,
        getSourcePosition: (d) => d.sourcePosition,
        getTargetPosition: (d) => d.targetPosition,
      }),
    ],
    [lines]
  );

  return (
    <MapLibre
      initialViewState={initialViewport}
      mapStyle={mapStyle}
      style={{ width: '100%', height: '100vh' }}
      onClick={(event) => handleClick(event)}
    >
      {markers.map(({ id, order, latitude, longitude }) => (
        <Marker key={id} longitude={longitude} latitude={latitude}>
          <div className="flex h-10 w-10 items-start justify-center bg-marker_icon">
            <div className="size-4 text-base font-bold	text-white">{order}</div>
          </div>
        </Marker>
      ))}
      <DeckGLOverlay layers={layers} />
      <FlightPanel markers={markers} />
      <NavigationControl position="top-left" />
      <FullscreenControl position="top-left" />
      <ScaleControl position="bottom-left" />
    </MapLibre>
  );
};
