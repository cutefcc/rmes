import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { MenuRouteConfig, MenuRouteConfigType } from '@constants/MenuRouteConfig';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

type GetMenuItemProps = {
  routeKey: string[];
  onClick: () => void;
};

function GetMenuItem(props: GetMenuItemProps): JSX.Element {
  const { onClick, routeKey = [] } = props;
  const navigate = useNavigate();
  const handleClick = (key: string) => () => {
    navigate(MenuRouteConfig[key].route);
    onClick();
  };
  return (
    <>
      {routeKey.map((item: string) => (
        <MenuItem onClick={handleClick(item)}>{MenuRouteConfig[item].label}</MenuItem>
      ))}
    </>
  );
}

function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <>
          <button className="btn-62" {...bindTrigger(popupState)}>
            <span>babylon</span>
          </button>
          {/* <Button className="h-40" variant="contained" {...bindTrigger(popupState)}>
            babylon
          </Button> */}
          <Menu {...bindMenu(popupState)}>
            <GetMenuItem routeKey={['28', '29', '30', '36']} onClick={popupState.close} />
          </Menu>
        </>
      )}
    </PopupState>
  );
}
const Header = () => (
  <div className="h-64 bg-slate-900 pl-60 flex justify-start items-center">
    {/* <div className="text-white h-full">playground</div> */}
    <MenuPopupState />
  </div>
);
export default Header;
