import React from 'react';
import { GAME_RULES ,CLOSE} from '../../constants/constants';
import { Modal, Button } from 'react-daisyui';

interface GamesRulesProps {
    isOpen: boolean;
    language: 'en' | 'th';// หรือใช้ enum ถ้าต้องการ
    closeModal: () => void;
}
interface Rule {
    en: string;
    th: string;
    subRules?: { [key: string]: { en: string; th: string; } };
}
interface SubRule {
    en: string;
    th: string;
}
const isRuleWithSubRules = (rule: any): rule is Rule & { subRules: any } => {
    return rule.subRules !== undefined;
};

const GamesRules: React.FC<GamesRulesProps> = ({ isOpen, language, closeModal }) => {
    return (
        <Modal open={isOpen} onClose={closeModal} className="max-w-5xl text-gray-10">
            <Modal.Header className="flex justify-between items-center">
                <h2 className="font-bold text-lg text-gray-800">
                    {GAME_RULES.TITLE[language]}
                </h2>
                <button className="btn btn-circle btn-ghost" onClick={closeModal}>
                    ✖
                </button>
            </Modal.Header>
            <Modal.Body className="py-4 text-gray-600 max-h-[400px] overflow-auto">

                {/* Basic Rules */}
                <h3 className="text-md font-semibold">{GAME_RULES.BASIC_RULES.title[language]}</h3>
                <ol className="list-decimal list-inside pl-4 space-y-2">
                    {Object.entries(GAME_RULES.BASIC_RULES.rules).map(([key, rule]) => (
                        <li key={key}>
                            {`${rule[language]}`}
                            {isRuleWithSubRules(rule) && (
                                <ul className="list-disc list-inside pl-4 space-y-1">
                                    {Object.entries(rule.subRules).map(([subKey, subRule]) => (
                                        <li key={subKey}>{(subRule as SubRule)[language]}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ol>

                {/* Scoring Rules */}
                <h3 className="mt-4 text-md font-semibold">{GAME_RULES.SCORING_RULES.title[language]}</h3>
                <ol className="list-decimal list-inside pl-4 space-y-2">
                    {Object.entries(GAME_RULES.SCORING_RULES.rules).map(([key, rule]) => (
                        <li key={key}>
                            {`${rule[language]}`}
                            {rule.subRules && (
                                <ul className="list-disc list-inside pl-4 space-y-1">
                                    {Object.entries(rule.subRules).map(([subKey, subRule]) => (
                                        <li key={subKey}>{subRule[language]}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ol>

                {/* Gameplay Steps */}
                <h3 className="mt-4 text-md font-semibold">{GAME_RULES.GAMEPLAY_STEPS.title[language]}</h3>
                <ul className="list-disc list-inside pl-4 space-y-2">
                    {Object.entries(GAME_RULES.GAMEPLAY_STEPS.steps).map(([key, step]) => (
                        <li key={key}>
                            {step[language]}
                            {step.subSteps && (
                                <ol className="list-decimal list-inside pl-4 space-y-1">
                                    {Object.entries(step.subSteps).map(([subKey, subStep]) => (
                                        <li key={subKey}>{` ${subStep[language]}`}</li>
                                    ))}
                                </ol>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Example Scoring */}
                <h3 className="mt-4 text-md font-semibold">{GAME_RULES.EXAMPLE_SCORING.title[language]}</h3>
                <ul className="list-disc list-inside pl-4 space-y-2">
                    {GAME_RULES.EXAMPLE_SCORING.example.map((example, index) => (
                        <li key={index}>{example[language]}</li>
                    ))}
                </ul>

                {/* Note */}
                <p className="mt-4 italic">{GAME_RULES.NOTE[language]}</p>
            </Modal.Body>
            <Modal.Actions>
                <Button onClick={closeModal} color="primary">{CLOSE[language]}</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default GamesRules;
