import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'tom13zebras';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // Actions

  const [walletAddress, setWalletAddress] = useState(null);

  
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

		  /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */
		  const response = await solana.connect({ onlyIfTrusted: true });
		  console.log(
			'Connected with Public Key:',
			response.publicKey.toString()
		  );

		   /*
           * Set the user's publicKey in state to be used later!
           */
		   setWalletAddress(response.publicKey.toString());

        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
	const { solana } = window;
  
	if (solana) {
	  const response = await solana.connect();
	  console.log('Connected with Public Key:', response.publicKey.toString());
	  setWalletAddress(response.publicKey.toString());
	}
  };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

	
	
	
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Renaissance Shade</p>
          <p className="sub-text">An NFT drop of</p>
		  <p className="sub-head">Old Masters Throwing Shade</p>
		  
		  
          {!walletAddress && renderNotConnectedContainer()}
		 </div>
		
		{walletAddress && <CandyMachine walletAddress={window.solana} />}
		<div className="divider">&nbsp;</div>
		<p className="thumbnail-header">NFT's</p>
		<div className="thumbnail-container">
			<img className="thumbnails" src="https://picsum.photos/100/65?random=1" alt="pic" width="100" height="65" />
			<img className="thumbnails" src="https://dummyimage.com/100x65/331155/fff" alt="pic" width="100" height="65" />
			<img className="thumbnails" src="https://picsum.photos/100/65?random=2" alt="pic" width="100" height="65" />
			<img className="thumbnails" src="https://dummyimage.com/100x65/338822/fff" alt="pic" width="100" height="65" />
			<img className="thumbnails" src="https://picsum.photos/100/65?random=3" alt="pic" width="100" height="65" />
			<img className="thumbnails" src="https://dummyimage.com/100x65/882211/fff" alt="pic" width="100" height="65" />
		</div>
		<div className="divider">&nbsp;</div>
		
		<p className="candy-text">NFT's and Site made  with Candy 🍭 Machine by Metaplex</p>
		<div className="footer-container">
		
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
	
        </div>
      </div>
    </div>
  );
};

export default App;
