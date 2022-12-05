import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { MenuRouteConfig, MenuRouteConfigType } from '@constants/MenuRouteConfig';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useEffect } from 'react';

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

function MenuPopupState(props) {
  const { text, routeKey } = props;
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <>
          {/* <button className="btn-62" {...bindTrigger(popupState)}>
            <span>{text}</span>
          </button> */}
          <Button {...bindTrigger(popupState)}>{text}</Button>
          <Menu {...bindMenu(popupState)}>
            <GetMenuItem routeKey={routeKey} onClick={popupState.close} />
          </Menu>
        </>
      )}
    </PopupState>
  );
}
const Header = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate(MenuRouteConfig['0'].route);
  };

  useEffect(() => {
    console.log('header render');
  });
  return (
    <div className="h-64 bg-slate-900 pl-60 flex justify-start items-center">
      <Button variant="contained" onClick={handleHome}>
        HOME
      </Button>
      {/* <MenuPopupState text="babylon" routeKey={['28', '29', '30', '36']} />
      <MenuPopupState text="three" routeKey={['32', '37']} />
      <MenuPopupState text="react-three-fiber" routeKey={['34', '38']} /> */}
      <MenuPopupState text="store" routeKey={['23', '25', '24', '50']} />
      {/* <MenuPopupState
        text="daily"
        routeKey={['27', '40', '41', '42', '43', '44', '45', '46', '47', '48']}
      /> */}
      <MenuPopupState text="ChainBlock" routeKey={['49']} />
    </div>
  );
};
export default Header;
