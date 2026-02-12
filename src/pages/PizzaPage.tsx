import Pizza from '../components/Pizza';
import Plate from '../components/Plate';

type PizzaPageProps = {
  handleClose?: () => void;
};

function PizzaPage({ handleClose }: PizzaPageProps) {
  const size = 1800;
  const sliceCount = 8;

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <Plate size={size} onClick={handleClose} />
      </div>
      <div className="relative z-10">
        <Pizza sliceCount={sliceCount} size={size} />
      </div>
    </>
  );
}

export default PizzaPage;
