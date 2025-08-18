import { Link } from "react-router";

interface HeaderWithIconProps {
  backText: string;
  backTo: string;
  title: string;
  iconClass: string;
}

const HeaderWithIcon = ({
  backText,
  title,
  iconClass,
  backTo,
}: HeaderWithIconProps) => {
  return (
    <div className="flex items-center mb-6">
      <Link
        to={backTo}
        className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
      >
        <i className="fas fa-arrow-left mr-2" /> Back to {backText}
      </Link>
      <h1 className="text-2xl font-bold text-white flex items-center">
        <i className={`${iconClass} text-blue-400 mr-3`} /> {title}
      </h1>
    </div>
  );
};

export default HeaderWithIcon;
