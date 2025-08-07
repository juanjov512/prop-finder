import React, { useCallback } from "react";
import { faHome, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCollapsible } from "@/contexts/CollapsibleContext";
import Button from "@/components/ui/button";
import AutocompleteSearchBar from "@/components/ui/searchbar";
import { searchOptions, SearchOption } from "@/data/searchOptions";
import {
  NavbarContainer,
  NavbarLeft,
  NavbarCenter,
  NavbarRight,
} from "./styles";

interface NavbarProps {
  onSearch: (query: string) => void;
  onSelectOption?: (option: SearchOption) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onSelectOption }) => {
  const { toggle } = useCollapsible();

  const handleSearch = useCallback(
    (query: string) => {
      onSearch(query);
    },
    [onSearch]
  );

  const handleSelectOption = useCallback(
    (option: SearchOption) => {
      onSelectOption?.(option);
      onSearch(option.label);
    },
    [onSelectOption, onSearch]
  );

  const handleHomeClick = () => {
    // Aquí puedes agregar la navegación al home
    console.log("Navigate to home");
  };

  return (
    <NavbarContainer>
      <NavbarLeft>
        <Button
          variant="ghost"
          onClick={handleHomeClick}
          leftIcon={<FontAwesomeIcon icon={faHome} />}
        >
          Home
        </Button>
      </NavbarLeft>

      <NavbarCenter>
        <AutocompleteSearchBar
          placeholder="Buscar propiedades..."
          onSearch={handleSearch}
          onSelect={handleSelectOption}
          options={searchOptions}
          debounceMs={500}
        />
      </NavbarCenter>

      <NavbarRight>
        <Button
          variant="secondary"
          onClick={toggle}
          leftIcon={<FontAwesomeIcon icon={faFilter} />}
        >
          Filtros
        </Button>
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;
