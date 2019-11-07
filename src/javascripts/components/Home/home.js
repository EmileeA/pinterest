import utilities from '../../helpers/utilities';
import './home.scss';

const homeMaker = () => {
  const domString = '<h1>PINTEREST</h1>';
  utilities.printToDom('home', domString);
};

export default { homeMaker };
