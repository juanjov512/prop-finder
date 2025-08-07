import { StyledPropertiesCount } from "./styles";
import type { IPropertiesCountProps } from "./types";

const PropertiesCount: React.FC<IPropertiesCountProps> = ({
  filteredProperties,
  totalCount,
}: IPropertiesCountProps) => (
  <StyledPropertiesCount>
    {filteredProperties} propiedad
    {filteredProperties !== 1 ? "es" : ""} encontrada
    {filteredProperties !== 1 ? "s" : ""}
    {totalCount > filteredProperties && ` de ${totalCount}`}
  </StyledPropertiesCount>
);

export default PropertiesCount;
