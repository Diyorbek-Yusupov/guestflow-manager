import { useOutsideClick } from '@/hooks/useOutsideClick';
import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: { x: number; y: number } }>`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface IMenuProps {
  children: React.ReactNode;
}

interface IToggleProps {
  id: string;
}

interface IListProps {
  id: string;
  children: React.ReactNode;
}

interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon: React.ReactElement;
  disabled?: boolean;
}

interface IMenuContext {
  openId: string;
  open: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
  position: IPosition;
  setPosition: React.Dispatch<React.SetStateAction<IPosition>>;
}

interface IPosition {
  x: number;
  y: number;
}

const MenusContext = createContext({} as IMenuContext);

function Menus({ children }: IMenuProps) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState<IPosition>({ x: 0, y: 0 });

  const open = setOpenId;
  const close = () => setOpenId('');
  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: IToggleProps) {
  const { close, open, openId, setPosition } = useContext(MenusContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    if (!rect) return;

    setPosition({
      x: window.innerWidth - rect?.width - rect?.x,
      y: rect?.y + rect?.width + 8,
    });
    id !== openId ? open(id) : close();
  };
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: IListProps) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (id !== openId) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, onClick, icon, disabled = false }: IButtonProps) {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.Menu = Menu;
Menus.List = List;
Menus.Button = Button;

export default Menus;
