import { Container } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <div className='py-3'>
      <Container>
        <div className='text-center'>
          &copy; Copyright {new Date().getFullYear()}
        </div>
      </Container>
    </div>
  );
};

export default Footer;
