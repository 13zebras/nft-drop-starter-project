import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'tom13zebras';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  
	// state
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

		  /*
      * The solana object provides
			* a function that will allow connecting
      * directly with the user's wallet!
      */
		  const response = await solana.connect({ onlyIfTrusted: true });
		  console.log(
			'Connected with Public Key:',
			response.publicKey.toString()
		  );

		   /*
        * Set the user's publicKey in state
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
   * Connect Wallet
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
   * Render if wallet not connected
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
   * Check if Phantom Wallet Connected
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
		  <p className="sub-head">NFT's of Old Masters Throwing Shade</p>
          {!walletAddress && renderNotConnectedContainer()}
		 </div>
		
		{walletAddress && <CandyMachine walletAddress={window.solana} />}
		
		
		{/*<div className="divider">&nbsp;</div>
		<p className="candy-text">NFT's and Site made  with Candy 🍭 Machine by Metaplex</p>*/}
		
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
