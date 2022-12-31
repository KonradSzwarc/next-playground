import { Icon } from '../../components/icon/icon';
import { Edit, Plus, Trash } from '../../generated/icons';

const IconPage = () => (
  <div className="flex p-8 gap-8">
    <Icon icon={Plus} size={24} />
    <Icon icon={Edit} size={24} />
    <Icon icon={Trash} size={24} />
  </div>
);

export default IconPage;
