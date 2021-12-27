const VolumeIcon = ({ mute, volumeIcon }) => {
  return (
    <div onMouseDown={mute} className="clickable volume-icon">
      <i className={volumeIcon()} />
    </div>
  );
};

export default VolumeIcon;
