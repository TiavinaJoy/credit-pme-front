import { PlusOutlined } from '@ant-design/icons';

const icons = {
    PlusOutlined
}

const formulaire = {
  id: 'Forms',
  title: 'Forms',
  type: 'group',
  children: [
    {
      id: 'add-form',
      title: 'Nouvelle demande',
      type: 'item',
      url: '/formulaire-demande',
      icon: icons.PlusOutlined
    },
  ]
};

export default formulaire;
