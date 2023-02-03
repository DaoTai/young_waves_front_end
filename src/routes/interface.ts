export default interface Route {
   path: string;
   component: React.FC;
   children?: Array<Route>;
}
