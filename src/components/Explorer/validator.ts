import m from 'mithril';
import { ListTile } from 'polythene-mithril'
import Loader from '../Common/loader';
import Nav from "../Nav";

const model = {
	validator: '',
	loading: false
};


const ChainInfo: m.Component =  {

		async oncreate() {
      model.validator = m.route.param('id');
			// model.loading = true;
      //
			// await polkaDot.set();
			// const [count, validators, chain, lastBlock] = await Promise.all([
			// 	polkaDot.validatorCount(),
			// 	polkaDot.validators(),
			// 	polkaDot.chain(),
			// 	polkaDot.chainHeader()
			// ]);
      //
			// model.count = count;
			// model.validators = validators;
			// model.chain = chain;
			// model.lastBlock = lastBlock;
			// model.loading = false;
			// m.redraw();

		},
		view: () => {
				return m('.home',
          m(Nav),
          m('.main',
            m('div.padding-10p',
              m('.row.p-top-24',
              model.loading ? m(Loader, {loading: model.loading}) : m('div',
                  m('.layout.horizontal', [
                    m('.flex.one',
                      m(ListTile, {
                        title: 'Validator',
                        subtitle: model.validator
                      })
                    )
                  ])
                )
              )
            )
          )
        )
			}
	};

export default ChainInfo;
