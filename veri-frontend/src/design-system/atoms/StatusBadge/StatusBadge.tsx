import { Badge, Tooltip } from '@chakra-ui/react';
import { CapitalizeFirstLetter } from '../../../utils/general';
import { FC, useState } from 'react';
import { VeriFormValues, VeriListType } from '../../../types/veris';
import { Recipient } from '../../../types';

const getTooltipLabel = (status: string) => {
  switch (status) {
    case 'draft':
      return 'VERI is not minted yet';
    case 'created':
      return 'VERI is minted';
    case 'disabled':
      return 'VERI is not minted yet OR date lies in the future';
    case 'enabled':
      return `VERI is minted AND date doesn't lie in the future`;
    case 'pending':
      return `Minting hasn't started yet`;
    case 'minting':
      return 'Minting is ongoing';
    case 'minted':
      return 'Minting has finished';
    default:
      return '';
  }
};

interface BadgeWithTouchFriendlyTooltipProps {
  item: VeriListType | Recipient | VeriFormValues;
}

const StatusBadge: FC<BadgeWithTouchFriendlyTooltipProps> = ({ item }) => {
  const [isLabelOpen, setIsLabelOpen] = useState(false);
  return (
    <Tooltip
      label={getTooltipLabel(item.status.toLowerCase())}
      isOpen={isLabelOpen}
    >
      <Badge
        variant={item.status.toLowerCase()}
        onMouseEnter={() => setIsLabelOpen(true)}
        onMouseLeave={() => setIsLabelOpen(false)}
        onClick={() => setIsLabelOpen(true)}
      >
        {CapitalizeFirstLetter(item.status)}
      </Badge>
    </Tooltip>
  );
};

export default StatusBadge;
