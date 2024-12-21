import  chefClaudeLogo from './assets/chef-claude-icon.png' ;

function Header() {
    return (
        <header>
            <img src={chefClaudeLogo} />
            <h1>Chef Claude</h1>
        </header>
    );
}

export default Header;