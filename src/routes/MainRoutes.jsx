import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import FormulaireDemande from '../pages/commercial/formulaire-demande';
import RecipeList from '../pages/commercial/recipe-list';
import RecipeDetail from '../pages/commercial/recipe-detail';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <DashboardLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'formulaire-demande',
            element: <FormulaireDemande />
        },
        {
            path: 'recipes',
            children: [
                {
                    index: true,
                    element: <RecipeList />
                },
                {
                    path: ':id',
                    element: <RecipeDetail />
                }

            ]
        }
    ]
};

export default MainRoutes;
