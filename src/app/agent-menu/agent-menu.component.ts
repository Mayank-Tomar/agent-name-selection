import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-agent-menu',
  templateUrl: './agent-menu.component.html',
  styleUrls: ['./agent-menu.component.scss']
})
export class AgentMenuComponent {
  textAreaContent: string = '';
  showDropdown: boolean = false;
  dropdownOptions: string[] = ["Gina Williams", "Jake Williams", "Jamie John", "John Doe", "Jeff Stewart", "Paula M. Keith"];
  highlightedIndex: number = -1;
  highlighter: boolean = false;

  @ViewChild('agentTextarea', { static: true }) agentTextareaRef!: ElementRef;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.showDropdown) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.highlightNextOption();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.highlightPreviousOption();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (this.highlightedIndex >= 0 && this.highlightedIndex < this.dropdownOptions.length) {
          this.insertOption(this.dropdownOptions[this.highlightedIndex]);
        }
      }
    }
  }

  highlightNextOption(): void {
    this.highlightedIndex =
      this.highlightedIndex === this.dropdownOptions.length - 1 ? 0 : this.highlightedIndex + 1;
  }

  highlightPreviousOption(): void {
    this.highlightedIndex =
      this.highlightedIndex === 0 ? this.dropdownOptions.length - 1 : this.highlightedIndex - 1;
  }

  insertOption(option: string): void {
    const textWithoutAtSymbol = this.textAreaContent.replace(/@/g, '');
    this.textAreaContent = textWithoutAtSymbol + option;
    const textareaElement: HTMLTextAreaElement = this.agentTextareaRef.nativeElement;
    textareaElement.style.color = 'black';
    this.highlighter = true;
    this.showDropdown = false;
  }

  onInputChange(event: any) {
    const value = event.target.value;
    if (value.length > 0 && value.includes('@')) {
      this.showDropdown = true;
      const filter = value.substring(value.indexOf('@') + 1);;
      this.filterAgents(filter);
    } else {
      this.showDropdown = false;
      this.highlighter = false;
    }
  }

  filterAgents(filter: string) {
    this.showDropdown = true;
    this.dropdownOptions = ["Gina Williams", "Jake Williams", "Jamie John", "John Doe", "Jeff Stewart", "Paula M. Keith"].filter(agent =>
      agent.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
