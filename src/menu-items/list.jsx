import { PlusOutlined } from '@ant-design/icons';

const icons = {
    PlusOutlined
}

const list = {
    id: 'Lists',
    title: 'Lists',
    type: 'group',
    children: [
        {
            id: 'recipe-list',
            title: 'Recipes',
            type: 'item',
            url: '/recipes',
            icon: icons.PlusOutlined
        },
    ]
};

export default list;
