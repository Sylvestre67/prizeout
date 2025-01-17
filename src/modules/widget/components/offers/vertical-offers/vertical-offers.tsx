import React from 'react';
import Classnames from 'classnames';
import { PrizeoutOffer, PrizeoutOfferSettings, toggleOffer } from '../../../../../slices/offers-slice';
import { OfferGiftCard } from '../offer-gift-card/offer-gift-card';

import './vertical-offers.less';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { toggleOfferFromCart } from '../../../../../slices/checkout-slice';

interface OfferView {
    offers: PrizeoutOffer[];
    viewSettings?: PrizeoutOfferSettings;
}

const VerticalOffers: React.FC<OfferView> = ({ offers, viewSettings }): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const heading = viewSettings.title || 'Recommended';
    const subtitle = viewSettings.subtitle || null;
    const classes: string = Classnames('vertical-offers', { '--has-subtitle': subtitle });

    const offerClickHandler = (offer: PrizeoutOffer) => {
        dispatch(toggleOffer(offer));
        dispatch(toggleOfferFromCart(offer));
    };

    const returnOffers = () => {
        return offers.map((offer) => (
            <OfferGiftCard
                key={`${heading}-${offer.name}`}
                offer={offer}
                onClickHandler={() => offerClickHandler(offer)}
            />
        ));
    };

    return (
        <div className={classes}>
            <h2>{heading}</h2>
            {subtitle && <h3>{subtitle}</h3>}
            {offers && <div className="vertical-offers__gift-cards">{returnOffers()}</div>}
        </div>
    );
};

export default VerticalOffers;
