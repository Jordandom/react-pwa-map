import { memo } from 'react';
import { Markers } from 'types';

const MarkerItem = memo(({ id, order, latitude, longitude }: Markers) => (
  <div key={id} className="mb-4 flex items-center gap-2 border-b border-white">
    <div className="flex items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
        {order}
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <div className="text-base font-bold text-white">{latitude}</div>
      <div className="text-base font-bold text-white">{longitude}</div>
    </div>
  </div>
));

MarkerItem.displayName = 'MarkerItem';

const FlightPanel = ({ markers }: { markers: Markers[] }) => {
  return (
    <div className="absolute right-0	top-0 h-full w-96 overflow-y-auto bg-[#00000069] p-4">
      <h1 className="text-xl font-bold text-white">
        PLANNED FLIGHT TRAJECTORY
      </h1>
      {markers.map((marker) => (
        <MarkerItem key={marker.id} {...marker} />
      ))}
    </div>
  );
};

const MemoizedFlightPanel = memo(FlightPanel);

export default MemoizedFlightPanel;
