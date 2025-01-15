import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const onNextClick = () => {
		if (activeIndex < steps.length - 1) {
			setActiveIndex(activeIndex + 1);
		}
	}

	const onBackClick = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	}

	const onRestartClick = () =>  {
		setActiveIndex(0);
	}

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const isLastStep = activeIndex >= steps.length - 1;
	const isFirstStep = activeIndex === 0;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{steps.map((item, index) => (
							<li key={item.id} className={styles['steps-item'] + ' ' + (index < activeIndex ? styles.done : ''
								) + ' ' + (index === activeIndex ? styles.active : '')}>
								<button onClick={() => setActiveIndex(index)} className={styles['steps-item-button']}>{index + 1}</button>
								{item.title}
							</li>
                    	))}
					</ul>
					<div className={styles['buttons-container']}>
						<button onClick={onBackClick} className={styles.button} disabled={isFirstStep}>Назад</button>
						<button onClick={() => (isLastStep ? onRestartClick() : onNextClick())} className={styles.button}>
							{isLastStep ? 'Начать сначала' : 'Далее'}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
