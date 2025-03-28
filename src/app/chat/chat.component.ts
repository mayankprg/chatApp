import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ChatService } from "../chat.service";

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  private chatService = inject(ChatService);
  messages= signal<string[]>([]);

  chatForm = new FormGroup ({
    message: new FormControl('',{
      validators: [Validators.required]
    })
    
  })

  ngOnInit(): void {
    this.chatService.getMessages().subscribe({
      next: (val) => this.messages.set([...this.messages(), val])
    })
  }

  onSubmit() {
    console.log(this.chatForm.value.message);
    if (this.chatForm.valid) {
      console.log("senging");
      
      this.chatService.sendMessage(this.chatForm.value.message!)
    }
  }
 
}
