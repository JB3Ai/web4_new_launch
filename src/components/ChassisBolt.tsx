import React from 'react';

interface ChassisBoltProps {
  className?: string;
  size?: number;
  rotation?: number;
  label?: string;
}

export const ChassisBolt: React.FC<ChassisBoltProps> = ({
  className = '',
  size = 14,
  rotation = 45,
  label,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      title={label || 'Rack Mounting Screw'}
    >
      {/* Outer stamped washer recess */}
      <div
        className="rounded-full bg-[#181C22] p-[1.5px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {/* Bolt head with machined brushed metal finish */}
        <div
          className="w-full h-full rounded-full relative flex items-center justify-center bolt-hardware"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #8C96A6 0%, #586170 50%, #303742 100%)',
          }}
        >
          {/* Slotted screwdriver channel */}
          <div
            className="h-[2px] w-[65%] bg-[#12151B] shadow-[0_0.5px_0_rgba(255,255,255,0.3)] rounded-[0.5px]"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
      </div>
    </div>
  );
};
