import { Icon } from '../../components/icon/icon';
import { Edit, Plus, Trash } from '../../generated/icons';

const IconPage = () => (
  <div className="flex p-8 gap-8">
    <Icon icon={Plus} className="w-6 h-6" />
    <Icon icon={Edit} className="w-6 h-6" />
    <Icon icon={Trash} className="w-6 h-6" />
  </div>
);

export default IconPage;
