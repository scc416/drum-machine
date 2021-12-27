const VolumeIcon = ({ mute, volumeIcon }) => {
  return (
    <div onMouseDown={mute} className="clickable to-be-clicked">
      <i className={volumeIcon()} />
    </div>
  );
};

export default VolumeIcon;
