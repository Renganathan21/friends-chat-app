import logo from '../../../../assets/friends.png'
const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <img src={logo} alt="logo" className="w-10 h-10" />
      <span className="text-3xl font-semibold ">Friends</span>
    </div>
  );
};

export default Logo;
