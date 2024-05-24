import styles from './app.module.css';
import data from './data.json';
import React, { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data); // я так и не поняла зачем создавать состояние для steps
	const [activeIndex, setActiveIndex] = useState(0); // индекс данных каждого шага

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const handleBackClick = () => {
		setActiveIndex(activeIndex - 1);
	};
	const handleForwardClick = () => {
		setActiveIndex(activeIndex + 1);
	};
	const handleRestartClick = () => {
		setActiveIndex(0);
	};
	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const isTheFirstStep = activeIndex === 0;
	const isTheLastStep = activeIndex === data.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => (
							<li
								key={step.id}
								className={`${styles['steps-item']} ${index <= activeIndex ? styles.done : ''}`}
							>
								<button
									onClick={() => setActiveIndex(index)}
									className={styles['steps-item-button']}
								>
									{index + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<button
						onClick={() =>
							isTheFirstStep ? handleRestartClick() : handleBackClick()
						}
						className={styles.button}
						disabled={isTheFirstStep}
					>
						Назад
					</button>
					<button
						onClick={() =>
							isTheLastStep ? handleRestartClick() : handleForwardClick()
						}
						className={styles.button}
					>
						{isTheLastStep ? 'Начать сначала' : 'Далее'}
					</button>
				</div>
			</div>
		</div>
	);
};
